export const isValidTypeFile = (file) => file.type.startsWith('image/') || /.(jpg|jpeg|png|gif)$/i.test(file.name);
