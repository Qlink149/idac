import { BRAND } from "../../lib/brandConfig";

const VARIANT_CLASS = {
  sidebar: "h-9 w-auto max-w-[11rem] object-contain object-left",
  login: "h-20 w-auto max-w-xs object-contain",
  splash: "h-16 w-auto max-w-sm object-contain",
  header: "h-7 w-auto max-w-[9rem] object-contain",
};

function resolveLogoSrc(variant, darkBackground) {
  if (darkBackground) {
    if (variant === "header" && BRAND.logoMarkDarkUrl) return BRAND.logoMarkDarkUrl;
    return BRAND.logoDarkUrl || BRAND.logoUrl;
  }
  if (variant === "header" && BRAND.logoMarkUrl) return BRAND.logoMarkUrl;
  return BRAND.logoUrl;
}

/**
 * IDAC brand logo — uses dedicated light/dark PNG assets (no CSS filter hacks).
 */
export default function BrandLogo({
  variant = "sidebar",
  className = "",
  darkBackground = true,
  testId,
}) {
  const src = resolveLogoSrc(variant, darkBackground);

  if (!src) {
    return (
      <span
        className={`font-serif font-bold tracking-wider ${className}`}
        data-testid={testId}
      >
        {BRAND.name}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={BRAND.logoAlt}
      className={`${VARIANT_CLASS[variant] || VARIANT_CLASS.sidebar} ${className}`.trim()}
      data-testid={testId}
    />
  );
}
