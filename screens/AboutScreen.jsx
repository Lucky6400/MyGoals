import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { styles } from '../styles/style'

const AboutScreen = () => {
    return (
        <View style={styles.homeCont}>
            <ScrollView contentContainerStyle={{ padding: 10 }}>
                <Text style={styles.textWhite}>

                    Welcome to MyGoals, the ultimate Android app designed to help you stay organized and focused on achieving your goals. Developed by Lucky Jain, MyGoals is your go-to companion for effective goal management and tracking. With its intuitive interface and powerful features, this app is here to revolutionize the way you set, monitor, and accomplish your goals. {"\n\n"}

                    The first thing you'll notice when you launch MyGoals is its visually stunning dark theme. The elegant design not only enhances your user experience but also provides a soothing ambiance for you to concentrate on your goals. Whether you're a night owl or prefer a sleek aesthetic, our app's dark theme will captivate you from the moment you start using it.{"\n\n"}

                    MyGoals makes it effortless to keep track of your daily objectives. With the Today's Goals feature, you can view a consolidated list of the tasks and milestones you need to accomplish on any given day. This real-time overview ensures that you never miss an important deadline and enables you to stay on top of your game, boosting productivity and reducing stress.{"\n\n"}

                    In addition to Today's Goals, MyGoals offers specialized sections to help you manage your important, completed, and pending goals. The Important Goals section allows you to highlight and prioritize key objectives, ensuring that they receive the attention they deserve. By marking goals as completed, you can celebrate your achievements and track your progress over time. And for those pending goals that require your attention, MyGoals keeps them neatly organized in one place, making it easy for you to focus on what needs to be done.{"\n\n"}

                    Flexibility is a key feature of MyGoals. The app allows you to effortlessly edit and delete goals, adapting to any changes or modifications you might need along the way. Whether you want to refine a goal's description, adjust its due date, or completely remove it from your list, MyGoals provides the necessary tools to ensure your goal management is seamless and personalized.{"\n\n"}

                    MyGoals is more than just a task manager—it's a personal companion that helps you unlock your potential and achieve the results you desire. Its user-friendly interface, combined with powerful features, empowers you to take control of your goals and turn them into reality. Whether you're a student striving for academic success, an entrepreneur building your business empire, or simply someone looking to improve your personal well-being, MyGoals is the perfect app to support you every step of the way.
                </Text>
            </ScrollView>
        </View>
    )
}

export default AboutScreen