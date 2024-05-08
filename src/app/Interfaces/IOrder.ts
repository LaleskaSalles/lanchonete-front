import { IDrink } from "./IDrink";
import { IHamburger } from "./IHamburger";
import { IIngredients } from "./IIngredients";

export interface IOrder {
    id: number,
    date:  string,
    customer_name: string,
    phone: string,
    street: string,
    neighborhood: string,
    zip_code: string,
    complement: string,
    number: number,
    state: string,
    city: string,
    total_price: number,
    comments : string,
    drinks: IDrink[],
    hamburgers: IHamburger[],
    ingredients: IIngredients[]
}