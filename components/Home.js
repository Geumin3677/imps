import { useEffect, useState } from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, Vibration, View } from 'react-native';
import * as Font from 'expo-font'
import useCachedResources from './loadResource';

const Home = () => {
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [sec, setSec] = useState(null)
    const tmp = useCachedResources()
    const isLoaded = tmp[0]
    const table = tmp[1]

    const day = [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ] 

    setInterval(() => {
        const datet = new Date()
        var sec = (datet.getSeconds() < 10) ? (0 + String(datet.getSeconds())) : (datet.getSeconds())
        var min = (datet.getMinutes() < 10) ? (0 + String(datet.getMinutes())) : (datet.getMinutes())
        var hour = (datet.getHours() < 10) ? (0 + String(datet.getHours())) : (datet.getHours())
        const daye = `${(datet.getMonth() + 1)}/${datet.getDate()} ${day[datet.getDay()]}`
        const time = `${hour}:${min}`
        setTime(time)
        setSec(`${sec}`)
        setDate(daye)
    }, 1000);

    if(isLoaded)
    {
        return (
            <>
                <SafeAreaView style={style.TopBar}>
                    <Text style={style.Title}>IMPS</Text>
                </SafeAreaView>
                <View style={style.content}>
                    <View style={style.timeCxt}>
                        <Text style={style.Time}>{time}<Text style={style.sec}>{sec}</Text></Text>
                        <Text style={style.Date}>{date}</Text>
                    </View>
                    <View style={style.Cxt}>
                        {
                            table.map((wday, index) => (
                                <View key={index}>
                                    {
                                        wday.map((item, ind) => (
                                            (item.subject === '') ? (<></>) : (<Text style={style.box} key={ind}>{item.subject}</Text>)
                                        ))
                                    }
                                </View>
                            ))
                        }
                    </View>
                </View>
            </>
        )
    }
}

export default Home

const style = StyleSheet.create({
    TopBar: {
        backgroundColor: "#5eb2f7",
    },
    content: {
        display: 'flex',
        alignItems: 'baseline'
    },
    box: {
        width: 60,
        height: 50,
        fontFamily: 'Gmarket_M',
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Cxt: {
        margin: 15,
        marginTop: 0,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        shadowColor: '#c9c9c9',
        shadowRadius: 5,
        flexDirection: 'row'
    },
    Title: {
        fontSize: 30,
        fontWeight: 700,
        color: "#fff",
        margin: 20
    },
    timeCxt: {
        flexShrink: 1,
        margin: 15,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        shadowColor: '#c9c9c9',
        shadowRadius: 5,
    },
    Date: {
        fontSize: 25,
        fontFamily: 'Gmarket_B',
        color: "#5eb2f7",
        fontWeight: 500,
    },
    Time : {
        fontSize: 40,
        fontFamily: 'Gmarket_B',
        color: "#5eb2f7",
        fontWeight: 500,
    },
    sec: {
        fontSize: 20,
        fontFamily: 'Gmarket_B',
        color: "#5eb2f7",
        paddingLeft: 3,
        width: 35
    }
})