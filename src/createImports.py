import os

directory = os.path.dirname(os.path.realpath(__file__))

index = open(os.path.join(directory, "index.js"), "w")
imports = []

for subdir, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(".jsx") and file.find("Boiler") == -1:
            path = os.path.join(subdir, file)
            relPath = path.replace(directory, ".").replace("\\", "/")
            current = file.rstrip(".jsx")
            imports.append(current)
            index.write('import %s from "%s";\n' % (current, relPath))

index.write("export {")
for i, item in enumerate(imports):
    if(i):
        index.write(", " + item)
    else:
        index.write(item)

index.write("};")


index.close()
# print(os.path.join(subdir, file))
