import { useEffect, useState } from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, Vibration, View } from 'react-native';
import * as Font from 'expo-font'
import useCachedResources from './loadResource';

const Home = () => {
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [sec, setSec] = useState(null)
    const isLoaded = useCachedResources()
    const day = [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ] 

    setInterval(() => {
        const datet = new Date()
        const daye = `${(datet.getMonth() + 1)}/${datet.getDate()} ${day[datet.getDay()]}`
        const time = `${datet.getHours()}:${datet.getMinutes()}`
        setTime(time)
        setSec(`${datet.getSeconds()}`)
        setDate(daye)
    }, 1000);

    const handleClick = () => {
        Platform.OS === 'ios' && Vibration.vibrate([400])
    }

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
                    <View>
                        <Button
                            title='Alarm'
                            onPress={handleClick}
                        />
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
    
    Title: {
        fontSize: 30,
        fontWeight: 700,
        color: "#fff",
        margin: 10
    },
    timeCxt: {
        margin: 10,
    },
    Date: {
        fontSize: 20,
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
        marginLeft: 10
    }
})