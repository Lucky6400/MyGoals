import { StyleSheet } from "react-native";
import { danger, dark, primary } from "../theme/colors";

export const styles = StyleSheet.create({
    homeCont: {
        flex: 1,
        backgroundColor: dark,
        paddingTop: 30
    },
    listCard: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10
    },
    textWhite: {
        color: '#fff'
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        paddingHorizontal: 10
    },
    listCont: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff55',
        paddingBottom: 20
    },
    taskCard: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
    },
    taskName: {
        fontWeight: 600,
        color: dark
    },
    inputText: {
        height: 80,
        textAlignVertical: 'top',
        padding: 5,
        color: '#fff',
        width: '80%'
    },
    addBtn: {
        position: 'absolute',
        right: 10,
        top: '30%',
        width: 50,
        height: 50,
        backgroundColor: '#000',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputCont: { width: '100%', backgroundColor: '#909090', borderRadius: 10, },
    centeredView: {
        backgroundColor: '#00000052',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    modalView: {
        width: 400,
        backgroundColor: dark,
        paddingBottom: 20
    },
    actionCont: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    editBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary
    },
    centeredRow: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    deleteBtn: {
        position: 'absolute',
        top: 5,
        right: 55,
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: danger
    },
    progressCont: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    progBtn: {
        backgroundColor: '#ffffff',
        width: 40,
        height: 40,
        borderRadius: 5,
        color: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textWhiteBold: {
        fontWeight: "600",
        color: '#FFFFFF'
    },
    dateCont: {
        backgroundColor: primary,
        padding: 10,
        borderRadius: 5,
        marginVertical: 5
    }
})