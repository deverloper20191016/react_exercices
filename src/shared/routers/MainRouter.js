import { Route, Switch } from "react-router-dom";
import NotFound from "../../components/error-page/not-found/NotFound";
import Home from "../../containers/home/Home";
import ProductForm from "../../containers/product/ProductForm";
import ProductList from "../../containers/product/ProductList";
import InternalServer from "../../components/error-page/internal-server/InternalServer";
import ProductCategoryList from "../../containers/product-category/ProductCategoryList";
import ProductCategoryForm from "../../containers/product-category/ProductCategoryForm";
import Login from "../../components/login/Login";
import AuthRoute from "./AuthRouter";

const mainRouter = () => {
  return (
    <Switch>
      <AuthRoute path="/" exact component={Home} />
      <AuthRoute path="/product-list" component={ProductList} />
      <AuthRoute path="/product/add" component={ProductForm} />
      <AuthRoute
        path="/product/:id/edit"
        component={({ match, history }) => (
          <ProductForm match={match} history={history} />
        )}
      />

      <AuthRoute path="/product-category-list" component={ProductCategoryList} />

      <AuthRoute path="/product-category/add" component={ProductCategoryForm} />
      <AuthRoute
        path="/product-category/:id/edit"
        component={({ match, history }) => (
          <ProductCategoryForm match={match} history={history} />
        )}
      />
      <Route
        path="/login"
        component={({ history }) => <Login history={history} />}
      />

      <AuthRoute path="/500" component={InternalServer} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default mainRouter;
