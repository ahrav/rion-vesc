import {CommonActions} from '@react-navigation/native';

let navigator: any;

export const setNavigator = (nav: any) => {
  navigator = nav;
};

export const navigate = (routeName: string, params: any) => {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
};
