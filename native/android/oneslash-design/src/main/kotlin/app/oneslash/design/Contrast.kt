package app.oneslash.design

/**
 * Whether the increased-contrast colors apply. The system reports its contrast setting from
 * Android 14 (API 34): 0 is standard, 0.5 medium, 1 high. Medium and high take the increased set.
 */
internal fun usesIncreasedContrast(sdkInt: Int, systemContrast: Float?): Boolean =
    sdkInt >= 34 && systemContrast != null && systemContrast >= 0.5f
