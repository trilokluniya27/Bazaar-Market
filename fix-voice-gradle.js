const fs = require("fs");
const path = "node_modules/react-native-voice/android/build.gradle";

fs.readFile(path, "utf8", function (err, data) {
  if (err) return console.log(err);

  let result = data
    .replace(/compile fileTree/g, "implementation fileTree")
    .replace(/testCompile/g, "testImplementation");

  fs.writeFile(path, result, "utf8", function (err) {
    if (err) return console.log(err);
    console.log("✅ react-native-voice gradle fixed!");
  });
});
