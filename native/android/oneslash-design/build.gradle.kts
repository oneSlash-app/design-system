import groovy.json.JsonSlurper

plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.maven.publish)
}

// One version for the npm package, the Swift package and this library.
val odsVersion = (JsonSlurper().parse(rootDir.resolve("../../package.json")) as Map<*, *>)["version"] as String

group = "io.github.oneslash-app"
version = odsVersion

android {
    namespace = "app.oneslash.design"
    // The current Compose libraries need API 37.1 or later to compile against.
    compileSdk {
        version = release(37) { minorApiLevel = 2 }
    }

    defaultConfig {
        minSdk = 24
    }

    buildFeatures {
        compose = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    testOptions {
        unitTests {
            isIncludeAndroidResources = true
            all {
                // The gallery test writes images; it runs only when ODS_GALLERY_DIR is set.
                it.systemProperty("roborazzi.test.record", "true")
                it.maxHeapSize = "2g"
            }
        }
    }
}

dependencies {
    implementation(platform(libs.compose.bom))
    api(libs.compose.material3)
    implementation(libs.compose.ui)

    testImplementation(platform(libs.compose.bom))
    testImplementation(libs.junit)
    testImplementation(libs.kotlin.reflect)
    testImplementation(libs.robolectric)
    testImplementation(libs.compose.ui.test.junit4)
    testImplementation(libs.roborazzi)
    testImplementation(libs.roborazzi.compose)
    debugImplementation(libs.compose.ui.test.manifest)
}

// Published to Maven Central as io.github.oneslash-app:oneslash-design. See ../PUBLISHING.md.
mavenPublishing {
    publishToMavenCentral()
    // Signed when a key is supplied (the release workflow); a local publishToMavenLocal needs none.
    if (providers.gradleProperty("signingInMemoryKey").isPresent) signAllPublications()

    coordinates("io.github.oneslash-app", "oneslash-design", odsVersion)

    pom {
        name.set("oneSlash design system for Android")
        description.set("The oneSlash design system as a Jetpack Compose Material 3 theme: generated colors for every theme in light, dark and increased contrast, and the parts Material lacks.")
        url.set("https://github.com/oneSlash-app/design-system")
        licenses {
            license {
                name.set("MIT License")
                url.set("https://github.com/oneSlash-app/design-system/blob/main/LICENSE")
            }
        }
        developers {
            developer {
                id.set("oneSlash-app")
                name.set("oneSlash")
                url.set("https://github.com/oneSlash-app")
            }
        }
        scm {
            url.set("https://github.com/oneSlash-app/design-system")
            connection.set("scm:git:https://github.com/oneSlash-app/design-system.git")
            developerConnection.set("scm:git:ssh://git@github.com/oneSlash-app/design-system.git")
        }
    }
}
