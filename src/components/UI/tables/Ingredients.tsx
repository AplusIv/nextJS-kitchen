"use client";

import { useAuthStore } from "@/app/store/auth.store";
import { useIngredientStore } from "@/app/store/ingredient.store";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

const IngredientsTable = () => {
  const { ingredients, removeIngredient, isLoading } = useIngredientStore();
  const { isAuth } = useAuthStore();

  const handleDelete = async (id: string) => {
    console.log('handleDelete');
    
    await removeIngredient(id);
  };

  const getCategoryLabel = (value: string) => {
    const option = CATEGORY_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const getUnitLabel = (value: string) => {
    const option = UNIT_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  if (!isAuth) {
    return <p className="mt-4">Авторизуйтесь, чтобы увидеть список ингредиентов</p>;
  }

  return !isLoading && isAuth ? (
    <Table
      aria-label="Список ингредиентов"
      classNames={{
        wrapper: "mt-4",
        table: "w-full",
        th: "text-black",
        td: "text-black"
      }}
    >
      <TableHeader>
        <TableColumn>Название</TableColumn>
        <TableColumn>Категория</TableColumn>
        <TableColumn>Ед. изм.</TableColumn>
        <TableColumn>Цена за единицу</TableColumn>
        <TableColumn>Описание</TableColumn>
        <TableColumn>Действия</TableColumn>
      </TableHeader>
      <TableBody>
        {ingredients.map((ingredient) => (
          <TableRow key={ingredient.id}>
            <TableCell>{ingredient.name}</TableCell>
            <TableCell>{getCategoryLabel(ingredient.category)}</TableCell>
            <TableCell>{getUnitLabel(ingredient.unit)}</TableCell>
            <TableCell>
              {ingredient.pricePerUnit !== null
                ? `${ingredient.pricePerUnit} ₽`
                : "-"}
            </TableCell>
            <TableCell>{ingredient.description || "-"}</TableCell>
            <TableCell>
              <Button
                color="danger"
                size="sm"
                onPress={() => handleDelete(ingredient.id)}
              >
                Удалить
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <p className="mt-4">Загрузка...</p>
  );
};


export default IngredientsTable