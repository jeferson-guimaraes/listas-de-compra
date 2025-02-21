import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  List: {id: string, name: string};
};

export type ListScreenRouteProp = RouteProp<RootStackParamList, 'List'>

export type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home' | 'List'>

export interface NavigateProps {
	navigation: NavigationProps;
}