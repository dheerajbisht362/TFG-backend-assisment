import { Schema, model } from 'mongoose';
 
const GameDataSchema = new Schema({
    userId: String,
    GameDataId: String,
    Speed: String,
    Height: String,
    Weight: String,
    Impact: String
});
 
export default model(
    'GameData', GameDataSchema, 'GameDatas');