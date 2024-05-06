import { IIngredients } from "./IIngredients";

export interface IHamburger {
    id: number,
    name: string,
    description: string,
    price: number,
    ingredients: IIngredients[]
}