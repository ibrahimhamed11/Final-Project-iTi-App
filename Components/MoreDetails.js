import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper';


const MoreDetails = () => {
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);

    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.ScrollArea>
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                            <Text style={styles.descriptionText}>الخامة: قطن</Text>
                            <Text style={styles.descriptionText}>اللون: ابيض</Text>
                            <Text style={styles.descriptionText}>المصنع: BabyCare</Text>
                        </ScrollView>
                    </Dialog.ScrollArea>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: 400,
        color: '#320053',
        margin: 5,
    }
})

export default MoreDetails