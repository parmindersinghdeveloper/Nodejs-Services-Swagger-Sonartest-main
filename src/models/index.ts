import { dbConfig } from '../config/database';
import { UserFactory } from './user.model';
import { CoinFactory } from './coin.model';



export const User = UserFactory(dbConfig);
export const Coin = CoinFactory(dbConfig);


