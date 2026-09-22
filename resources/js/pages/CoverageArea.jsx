import { usePage } from '@inertiajs/react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import { Container } from '../components/Section';
import PublicLayout from '../layouts/PublicLayout';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function CoverageArea({ seo }) {
    const { site } = usePage().props;
    const [activeTab, setActiveTab] = useState('fwa');
    const [fwaData, setFwaData] = useState([]);
    const [ftthData, setFtthData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (activeTab === 'fwa') {
            fetchFwaData();
        }
        if (activeTab === 'ftth') {
            fetchFtthData();
        }
    }, [activeTab]);

    const fetchFwaData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://sheetdb.io/api/v1/v36428t06dzby');
            if (!response.ok) throw new Error('Gagal mengambil data FWA');
            const data = await response.json();
            setFwaData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchFtthData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://sheetdb.io/api/v1/6aeuma5j2lv3q');
            if (!response.ok) throw new Error('Gagal mengambil data FTTH');
            const data = await response.json();
            setFtthData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'fwa', label: 'FWA', count: fwaData.length },
        { id: 'ftth', label: 'FTTH', count: ftthData.length },
    ];

    const parseCoordinate = (value) => {
        if (value === null || value === undefined) return null;
        const cleaned = String(value).trim().replace(',', '.');
        const num = parseFloat(cleaned);
        if (!isFinite(num)) return null;
        return num;
    };

    const validMarkersFwa = fwaData.filter((item) => {
        const lat = parseCoordinate(item.latitude);
        const lon = parseCoordinate(item.longitude);
        return lat !== null && lon !== null && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
    });

    const validMarkersFtth = useMemo(() => {
        const filtered = ftthData.filter((item) => {
            const lat = parseCoordinate(item.Latitude);
            const lon = parseCoordinate(item.Longitude);
            return lat !== null && lon !== null && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
        });
        // Sampling intelligent: jika >2000 markers, ambil setiap N
        const sampleRate = filtered.length > 2000 ? Math.ceil(filtered.length / 2000) : 1;
        return filtered.filter((_, idx) => idx % sampleRate === 0);
    }, [ftthData]);

    const mapCenterFwa = validMarkersFwa.length > 0
        ? [
            validMarkersFwa.reduce((s, i) => s + parseCoordinate(i.latitude), 0) / validMarkersFwa.length,
            validMarkersFwa.reduce((s, i) => s + parseCoordinate(i.longitude), 0) / validMarkersFwa.length,
        ]
        : [-3.3760626, 114.5777271];

    const mapCenterFtth = validMarkersFtth.length > 0
        ? [
            validMarkersFtth.reduce((s, i) => s + parseCoordinate(i.Latitude), 0) / validMarkersFtth.length,
            validMarkersFtth.reduce((s, i) => s + parseCoordinate(i.Longitude), 0) / validMarkersFtth.length,
        ]
        : [-3.3760626, 114.5777271];

    const handleLocationClick = (item) => {
        const lat = parseCoordinate(item.latitude);
        const lon = parseCoordinate(item.longitude);
        if (mapRef.current && lat !== null && lon !== null) {
            mapRef.current.setView([lat, lon], 17);
        }
    };

    return (
        <PublicLayout seo={seo} transparentNav>
            <PageHeader
                eyebrow="Jangkauan"
                title="Coverage Area"
                description="Lihat area jangkauan layanan kami di Kalimantan Selatan. Cek apakah lokasi kamu sudah tercakup."
            />

            <div className="py-14 md:py-24">
                <Container>
                    <div className="mb-8 border-b border-gray-200">
                        <div className="flex gap-4 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                                        activeTab === tab.id
                                            ? 'border-primary-500 text-primary-500'
                                            : 'border-transparent text-ink/70 hover:text-ink'
                                    }`}
                                >
                                    {tab.label}
                                    {tab.count > 0 && <span className="ml-2 text-sm">({tab.count})</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {activeTab === 'fwa' && (
                        <div className="space-y-8">
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-[600px] relative z-10">
                                {loading ? (
                                    <div className="flex items-center justify-center h-full bg-gray-100">
                                        <div className="text-ink/70">Memuat peta...</div>
                                    </div>
                                ) : error ? (
                                    <div className="flex items-center justify-center h-full bg-gray-100">
                                        <div className="text-red-500">Error: {error}</div>
                                    </div>
                                ) : (
                                    <MapContainer ref={mapRef} center={mapCenterFwa} zoom={13} scrollWheelZoom={true} style={{ height: '100%' }}>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                        />
                                        {validMarkersFwa.map((item, idx) => (
                                            <Marker
                                                key={idx}
                                                position={[
                                                    parseCoordinate(item.latitude),
                                                    parseCoordinate(item.longitude),
                                                ]}
                                            >
                                                <Popup>
                                                    <div className="text-sm">
                                                        <p className="font-semibold">{item.label}</p>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        ))}
                                    </MapContainer>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'ftth' && (
                        <div className="space-y-8">
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-[600px] relative z-10">
                                {loading ? (
                                    <div className="flex items-center justify-center h-full bg-gray-100">
                                        <div className="text-ink/70">Memuat peta...</div>
                                    </div>
                                ) : error ? (
                                    <div className="flex items-center justify-center h-full bg-gray-100">
                                        <div className="text-red-500">Error: {error}</div>
                                    </div>
                                ) : (
                                    <MapContainer center={mapCenterFtth} zoom={12} scrollWheelZoom={true} style={{ height: '100%' }}>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                        />
                                        {validMarkersFtth.map((item, idx) => (
                                            <Marker
                                                key={idx}
                                                position={[
                                                    parseCoordinate(item.Latitude),
                                                    parseCoordinate(item.Longitude),
                                                ]}
                                            >
                                                <Popup>
                                                    <div className="text-sm">
                                                        <p className="font-semibold">{item['Nama Lokasi']}</p>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        ))}
                                    </MapContainer>
                                )}
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        </PublicLayout>
    );
}
