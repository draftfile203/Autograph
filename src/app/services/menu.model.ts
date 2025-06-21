export interface MenuItem {
  image: string;
  name: string;
  price: number;
  description: string;
  category: string;
  showDescription?: boolean;
  id: string; // Ensure your API includes this field for filtering
}
