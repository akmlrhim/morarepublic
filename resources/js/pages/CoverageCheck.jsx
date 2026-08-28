import { useForm, usePage } from "@inertiajs/react";
import Button from "../components/Button";
import CoverageResult from "../components/CoverageResult";
import CoverageResultSkeleton from "../components/CoverageResultSkeleton";
import PageHeader from "../components/PageHeader";
import { Section } from "../components/Section";
import PublicLayout from "../layouts/PublicLayout";
import { cx } from "../lib/format";

export default function CoverageCheck({
    areaSuggestions = [],
    serviceTypes = [],
    seo,
}) {
    const { flash } = usePage().props;
    const result = flash?.coverageResult ?? null;

    const { data, setData, post, processing, errors } = useForm({
        area: result?.query ?? "",
        service_type: result?.service_type ?? serviceTypes[0]?.value ?? "fwa",
    });

    function submit(event) {
        event.preventDefault();
        post("/cek-coverage", { preserveScroll: true });
    }

    return (
        <PublicLayout seo={seo} transparentNav>
            <PageHeader
                eyebrow="Cek Coverage"
                title="Cek Ketersediaan Layanan di Area Kamu"
                description="Masukkan nama kota, kecamatan, atau kelurahan kamu. Kami tidak menyimpan data pribadi kamu, hanya area yang dicek untuk keperluan perencanaan jaringan."
            />

            <Section id="cek-form">
                <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
                    <form
                        onSubmit={submit}
                        className="rounded-[var(--radius-card)] border border-line bg-white p-8 shadow-[var(--shadow-card)]"
                        noValidate
                    >
                        <div>
                            <label
                                htmlFor="area"
                                className="block text-sm font-semibold text-ink"
                            >
                                Area atau alamat
                            </label>
                            <input
                                id="area"
                                list="area-suggestions"
                                value={data.area}
                                onChange={(event) =>
                                    setData("area", event.target.value)
                                }
                                placeholder="Contoh: Banjarmasin"
                                autoComplete="off"
                                aria-describedby={
                                    errors.area ? "area-error" : "area-help"
                                }
                                aria-invalid={errors.area ? "true" : undefined}
                                className={cx(
                                    "mt-2 w-full rounded-xl border px-4 py-3 text-base text-ink transition placeholder:text-muted/60",
                                    errors.area
                                        ? "border-[color:var(--color-error)]"
                                        : "border-line",
                                )}
                            />
                            <datalist id="area-suggestions">
                                {areaSuggestions.map((name) => (
                                    <option key={name} value={name} />
                                ))}
                            </datalist>
                            {errors.area ? (
                                <p
                                    id="area-error"
                                    className="mt-2 text-sm text-[color:var(--color-error)]"
                                >
                                    {errors.area}
                                </p>
                            ) : (
                                <p
                                    id="area-help"
                                    className="mt-2 text-sm text-muted"
                                >
                                    Tulis nama wilayah kamu, tidak perlu alamat
                                    lengkap.
                                </p>
                            )}
                        </div>

                        <fieldset className="mt-8">
                            <legend className="text-sm font-semibold text-ink">
                                Jenis layanan
                            </legend>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                {serviceTypes.map((type) => (
                                    <label
                                        key={type.value}
                                        className={cx(
                                            "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition",
                                            data.service_type === type.value
                                                ? "border-primary-500 bg-primary-100/40"
                                                : "border-line hover:border-primary-300",
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="service_type"
                                            value={type.value}
                                            checked={
                                                data.service_type === type.value
                                            }
                                            onChange={(event) =>
                                                setData(
                                                    "service_type",
                                                    event.target.value,
                                                )
                                            }
                                            className="mt-1 accent-[color:var(--color-primary-500)]"
                                        />
                                        <span>
                                            <span className="block text-sm font-semibold text-ink">
                                                {type.short}
                                            </span>
                                            <span className="mt-1 block text-xs leading-relaxed text-muted">
                                                {type.label}
                                            </span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.service_type ? (
                                <p className="mt-2 text-sm text-[color:var(--color-error)]">
                                    {errors.service_type}
                                </p>
                            ) : null}
                        </fieldset>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="mt-8 w-full"
                        >
                            {processing ? "Mengecek..." : "Cek Sekarang"}
                        </Button>
                    </form>

                    {processing ? (
                        <CoverageResultSkeleton />
                    ) : (
                        <CoverageResult result={result} />
                    )}
                </div>
            </Section>
        </PublicLayout>
    );
}
