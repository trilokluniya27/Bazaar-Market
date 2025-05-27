import React from "react";
import { 
  View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, SafeAreaView 
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const menuItems = [
  { icon: "shopping-bag", text: "Your orders", screen: "OrdersScreen" },
  { icon: "heart", text: "Favorite orders", screen: "FavoritesScreen" },
  { icon: "settings", text: "Manage recommendations", screen: "RecommendationsScreen" },
  { icon: "train", text: "Order on train", screen: "TrainOrdersScreen" },
  { icon: "map-pin", text: "Address book", screen: "AddressBookScreen" },
  { icon: "eye-off", text: "Hidden Stores", screen: "HiddenStoresScreen" },
  { icon: "help-circle", text: "Online ordering help", screen: "HelpScreen" },
];

const AccountScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => navigation.navigate("SignIn") },
    ]);
  };

  const handleMenuClick = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            <View style={styles.profileImage}>
              <Text style={styles.profileText}>T</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Trilok Luniya</Text>
              <Text style={styles.userEmail}>luniyatrilok@gmail.com</Text>
              <TouchableOpacity>
                <Text style={styles.activityLink}>View activity</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Join Bazaar Market Button */}
          <TouchableOpacity style={styles.goldButton}>
            <Text style={styles.goldText}>
              <Icon name="award" size={20} color="#FFD700" /> Join Bazaar Market
            </Text>
            <Icon name="chevron-right" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Options */}
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Orders</Text>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.menuItem} 
                onPress={() => handleMenuClick(item.screen)}
              >
                <Icon name={item.icon} size={20} color="#999" />
                <Text style={styles.menuText}>{item.text}</Text>
                <Icon name="chevron-right" size={20} color="#999" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" size={20} color="red" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  profileSection: {
    backgroundColor: "white",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 75,
    height: 75,
    backgroundColor: "#d3e0ff",
    borderRadius: 75 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileInfo: {
    marginLeft: 15,
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  userEmail: {
    fontSize: 14,
    color: "#777",
  },
  activityLink: {
    fontSize: 14,
    color: "red",
    marginTop: 3,
  },
  goldButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: "space-between",
  },
  goldText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
  },
  logoutText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default AccountScreen;
