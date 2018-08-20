import { plansConstants } from '../constants/plans.constants';
import * as schema from './schemas';
import { authHeader } from '../helpers/auth.header';
const autHeader = authHeader();

export const getAllPlans = () => ({
  type: plansConstants.PLANS_GET_ALL,
  api: { headers: autHeader, endpoint: '/plans/plan_id' },
  schema: schema.planSchema
});

// export const changeMeal = (recipeId, mealId, day, mealTime) => ({
//   type: plansConstants.CHANGE_MEAL,
//   entities: {
//     meals_plan: {
//       [mealId]: {
//         id: mealId,
//         weekday: day,
//         meal_type: mealTime,
//         recipe_id: recipeId
//       }
//     }
//   }
// });
export const changeMeal = (recipeId, mealId, day, mealTime) => ({
  type: plansConstants.CHANGE_MEAL,
  api: { headers: autHeader, 
    endpoint: '/plans/plan_id/meal', 
    method: 'PUT', body: {meal_id: mealId, recipe_id: recipeId}}
});
