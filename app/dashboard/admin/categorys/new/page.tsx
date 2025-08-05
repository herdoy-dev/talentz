import CategoryForm from "./category-form";

function NewCategory() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-[500px] space-y-6">
        <h2>Create New Category</h2>
        <CategoryForm />
      </div>
    </div>
  );
}

export default NewCategory;
