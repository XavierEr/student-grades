declare module "*.svg" {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.scss" {
  const content: { readonly [key: string]: string };
  export default content;
}