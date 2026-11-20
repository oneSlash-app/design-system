import groovy.json.JsonSlurper

plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.compose)
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
    debugImplementation(libs.compose.ui.test.manifest)
}
