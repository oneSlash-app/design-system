// swift-tools-version: 6.2
import PackageDescription

let package = Package(
    name: "OneSlashDesign",
    platforms: [.iOS(.v26), .macOS(.v26)],
    products: [
        .library(name: "OneSlashDesign", targets: ["OneSlashDesign"]),
    ],
    targets: [
        .target(
            name: "OneSlashDesign",
            path: "native/swift/Sources/OneSlashDesign"
        ),
        .testTarget(
            name: "OneSlashDesignTests",
            dependencies: ["OneSlashDesign"],
            path: "native/swift/Tests/OneSlashDesignTests"
        ),
    ]
)
