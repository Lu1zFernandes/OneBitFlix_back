import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { User } from "./User";

Category.hasMany(Course, { as: "courses" });
Course.belongsTo(Category);

Course.belongsToMany(User, { through: Favorite });
Course.hasMany(Favorite, { as: "favoritesUsers", foreignKey: "course_id" });

Course.hasMany(Episode, { as: "episodes" }); //Episodes
Episode.belongsTo(Course);

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.hasMany(Favorite, { as: "favoritesCourses", foreignKey: "user_id" });

export { Course, Category, Episode, Favorite, User };
