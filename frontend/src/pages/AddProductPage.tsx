import { useState } from "react";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          name,
          price: Number(price),
          description,
          image,
        }
      );
      alert("Produk berhasil ditambahkan!");
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan produk");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama Produk</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Harga</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">URL Gambar</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;