export const sliceName = (displayName: string) => {
     const name = displayName.split(' ');
     return `${name[0]?.charAt(0)?.toUpperCase()}${name[1]?.charAt(0)?.toUpperCase()}`;
};
