# Publishing the Android library

The library is published to Maven Central as `io.github.oneslash-app:oneslash-design`, with the same
version as the npm package and the Swift package. The Release workflow publishes it when the four
secrets below exist, and skips it with a notice when they do not. Until the first publish, nothing
is on Maven Central.

## One-time setup (the owner)

1. Sign in to the Central Portal (https://central.sonatype.com) with the GitHub account that owns
   the `oneSlash-app` organization, and register the namespace `io.github.oneslash-app`. The portal
   verifies it against GitHub.
2. In the portal, generate a user token. Its two parts are the username and password below.
3. Create a GPG signing key for releases, publish its public key to a key server
   (`keys.openpgp.org`), and export the private key in ASCII armor.
4. Add four repository secrets to `oneSlash-app/design-system`:

   | Secret | Value |
   |---|---|
   | `MAVEN_CENTRAL_USERNAME` | the portal token's username |
   | `MAVEN_CENTRAL_PASSWORD` | the portal token's password |
   | `SIGNING_KEY` | the armored private key |
   | `SIGNING_PASSWORD` | the key's passphrase |

## Each release

Nothing to do. Bumping `version` in `package.json` and merging to `main` releases npm, the git tag
the Swift package reads, and this library.

## After the first publish

Check that an app can resolve it, in a throwaway Android project:

```kotlin
dependencies {
    implementation("io.github.oneslash-app:oneslash-design:<version>")
}
```

and that `OneSlashTheme { }` compiles.

## Locally

`./gradlew :oneslash-design:publishToMavenLocal` builds the artifact unsigned into `~/.m2`.
