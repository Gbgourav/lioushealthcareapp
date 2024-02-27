import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {VendorIcons} from '../components/VStackIcons';
import CompleteVendorProfile from '../screens/profile/Vendor/CompleteVendorProfile';
import Vdeliveries from '../screens/profile/Vendor/Vdeliveries';
import Vpartner from '../screens/profile/Vendor/Vpartner';
import Vhome from '../screens/profile/Vendor/Vhome';
import {connect} from 'react-redux';
import Splash from '../screens/auth/Splash';

const Tab = createBottomTabNavigator();

const Vendor = ({route}) => {
  const userData = route.params?.userData?.user;

  const activeTab = routeName => {
    const TabIcon = VendorIcons[routeName + 'S'];
    return {
      tabBarStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
      },
      tabBarItemStyle: {
        backgroundColor: '#0C4E5F',
        paddingVertical: 16,
        color: '#fff',
        height: 70,
      },
      tabBarLabelStyle: {color: '#fff', fontFamily: 'Quicksand-Medium'},
      tabBarIcon: ({size}) => <TabIcon fill="#fff" />,
      tabBarLabelPosition: 'below-icon',
      tabBarShowLabel: true,
    };
  };
  const defaultTab = routeName => {
    const TabIcon = VendorIcons[routeName];
    return {
      tabBarStyle: {
        height: 92,
      },
      tabBarItemStyle: {},
      tabBarLabelStyle: {color: '#000', display: 'none'},
      tabBarIcon: () => <TabIcon fill="black" />,
      tabBarShowLabel: false,
      tabBarLabel: () => null,
    };
  };
  return (
    <Tab.Navigator
      id="bottomNavigator"
      initialRouteName={
        userData?.is_profile_completed ? 'Vhome' : 'CompleteVendorProfile'
      }
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
      {!userData?.is_profile_completed ? (
        <Tab.Screen
          name="CompleteVendorProfile"
          component={CompleteVendorProfile}
          initialParams={userData}
          options={{headerShown: false}}
        />
      ) : null}
      <Tab.Screen
        name="Vhome"
        component={Vhome}
        initialParams={userData}
        options={{headerShown: false, tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="Vpartner"
        component={Vpartner}
        initialParams={userData}
        options={{headerShown: false, tabBarLabel: 'History'}}
      />
      <Tab.Screen
        name="Vdeliveries"
        component={Vdeliveries}
        initialParams={userData}
        options={{headerShown: false, tabBarLabel: 'Deliveries'}}
      />
    </Tab.Navigator>
  );
};

export default Vendor;
