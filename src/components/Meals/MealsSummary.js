import style from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={style.summary}>
      <h2>Elevated dining, delivered to your doorstep</h2>
      <p>
        Step into a world of culinary delight as you peruse our curated
        selection of gourmet meals. Experience the joy of a sumptuous lunch or
        dinner, all within the comforts of your own home
      </p>
      <p>
        Crafted by skilled chefs using the freshest ingredients, we're dedicated
        to providing an exceptional culinary journey from our kitchen to your
        table.
      </p>
    </section>
  );
};

export default MealsSummary;
