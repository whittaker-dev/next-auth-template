export const formatExtensionFile = (fileName: string) => {
  const segments = fileName.split(".");
  return { name: segments[0], extension: segments[segments.length - 1] };
};
