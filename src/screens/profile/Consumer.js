import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chome, {HomeStackScreen} from './Customer/Chome';
import Csearch from './Customer/Csearch';
import Calart from './Customer/Calart';
import Csettings from './Customer/Csettings';
import {Icons} from '../../components/icons';

const Tab = createBottomTabNavigator();

const Consumer = () => {
  const activeTab = routeName => {
    const TabIcon = Icons[routeName + 'S'];
    return {
      tabBarStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 92,
      },
      tabBarItemStyle: {
        backgroundColor: '#376095',
        paddingVertical: 16,
        color: '#fff',
        height: 92,
      },
      tabBarLabelStyle: {color: '#fff', fontFamily: 'Quicksand-Medium'},
      tabBarIcon: ({size}) => <TabIcon fill="#fff" />,
      tabBarLabelPosition: 'below-icon',
      tabBarShowLabel: true,
    };
  };
  const defaultTab = routeName => {
    const TabIcon = Icons[routeName];
    return {
      tabBarStyle: {
        height: 92,
      },
      tabBarItemStyle: {
        paddingVertical: 16,
        height: 92,
      },
      tabBarLabelStyle: {color: '#000'},
      tabBarIcon: () => <TabIcon fill="black" />,
      tabBarShowLabel: false,
      tabBarLabel: () => null,
    };
  };
  return (
    <Tab.Navigator
      id="bottomNavigator"
      initialRouteName="Home"
      screenOptions={({navigation, route}) => {
        const routeName = route.name;
        return {
          ...(navigation.isFocused() === true
            ? activeTab(routeName)
            : defaultTab(routeName)),
          headerShown: false,
          tabBarHideOnKeyboard: true,
        };
      }}>
      <Tab.Screen
        name="Chome"
        component={HomeStackScreen}
        options={{headerShown: false, tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="Csearch"
        component={Csearch}
        options={{headerShown: false, tabBarLabel: 'Search'}}
      />
      <Tab.Screen
        name="Calart"
        component={Calart}
        options={{headerShown: false, tabBarLabel: 'Alart'}}
      />
      <Tab.Screen
        name="Csettings"
        component={Csettings}
        options={{headerShown: false, tabBarLabel: 'Settings'}}
      />
    </Tab.Navigator>
  );
};

export default Consumer;
