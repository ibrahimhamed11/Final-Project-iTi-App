import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard, faMoneyBillWave, faMobileAlt, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { Card, Title, Button, Divider, Provider } from 'react-native-paper';

const PaymentScreen = () => {
    const [visaModalVisible, setVisaModalVisible] = useState(false);
    const [bankModalVisible, setBankModalVisible] = useState(false);
    const [vodafoneModalVisible, setVodafoneModalVisible] = useState(false);
    const [postaModalVisible, setPostaModalVisible] = useState(false);

    const [visaCardNumber, setVisaCardNumber] = useState('');
    const [visaCardHolder, setVisaCardHolder] = useState('');
    const [visaExpirationDate, setVisaExpirationDate] = useState('');

    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [bankAccountHolder, setBankAccountHolder] = useState('');

    const [vodafonePhoneNumber, setVodafonePhoneNumber] = useState('');

    const [postaAddress, setPostaAddress] = useState('');

    const handleVisaPayment = () => {
        // Visa payment validation logic
        if (visaCardNumber && visaCardHolder && visaExpirationDate) {
            // Process the payment
            setVisaModalVisible(false);
        }
    };

    const handleBankPayment = () => {
        // Bank account payment validation logic
        if (bankAccountNumber && bankAccountHolder) {
            // Process the payment
            setBankModalVisible(false);
        }
    };

    const handleVodafonePayment = () => {
        // Vodafone Cash payment validation logic
        if (vodafonePhoneNumber) {
            // Process the payment
            setVodafoneModalVisible(false);
        }
    };

    const handlePostaPayment = () => {
        // Posta payment validation logic
        if (postaAddress) {
            // Process the payment
            setPostaModalVisible(false);
        }
    };

    return (
        <Provider>
            <View style={styles.container}>
                <Text style={styles.title}>الدفع</Text>
                <View style={styles.paymentContainer}>
                    <TouchableOpacity style={styles.paymentButton} onPress={() => setVisaModalVisible(true)}>
                        <FontAwesomeIcon icon={faCreditCard} size={48} style={styles.creditCardIcon} />
                        <Text style={styles.paymentText}>الدفع بواسطة فيزا</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentButton} onPress={() => setBankModalVisible(true)}>
                        <FontAwesomeIcon icon={faMoneyBillWave} size={48} style={styles.icon} />
                        <Text style={styles.paymentText}>الدفع بواسطة الحساب المصرفي</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentButton} onPress={() => setVodafoneModalVisible(true)}>
                        <FontAwesomeIcon icon={faMobileAlt} size={48} style={styles.icon} />
                        <Text style={styles.paymentText}>الدفع بواسطة فودافون كاش</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentButton} onPress={() => setPostaModalVisible(true)}>
                        <FontAwesomeIcon icon={faShippingFast} size={48} style={styles.icon} />
                        <Text style={styles.paymentText}>الدفع بواسطة البوستة</Text>
                    </TouchableOpacity>
                </View>

                {/* Visa Modal */}
                <Modal visible={visaModalVisible} animationType="slide" transparent>
                    <View style={styles.modalContainer}>
                        <Card style={styles.modalCard}>
                            <Title style={styles.modalTitle}>دفع بواسطة فيزا</Title>
                            <Divider style={styles.divider} />
                            <TextInput
                                style={styles.input}
                                placeholder="رقم البطاقة"
                                value={visaCardNumber}
                                onChangeText={setVisaCardNumber}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="اسم صاحب البطاقة"
                                value={visaCardHolder}
                                onChangeText={setVisaCardHolder}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="تاريخ الانتهاء (MM/YY)"
                                value={visaExpirationDate}
                                onChangeText={setVisaExpirationDate}
                            />
                            <View style={styles.modalButtons}>
                                <Button style={styles.modalButton} mode="contained" onPress={() => setVisaModalVisible(false)}>
                                    إلغاء
                                </Button>
                                <Button style={styles.modalButton} mode="contained" onPress={handleVisaPayment}>
                                    دفع
                                </Button>
                            </View>
                        </Card>
                    </View>
                </Modal>

                {/* Bank Account Modal */}
                <Modal visible={bankModalVisible} animationType="slide" transparent>
                    <View style={styles.modalContainer}>
                        <Card style={styles.modalCard}>
                            <Title style={styles.modalTitle}>دفع بواسطة الحساب المصرفي</Title>
                            <Divider style={styles.divider} />
                            <TextInput
                                style={styles.input}
                                placeholder="رقم الحساب البنكي"
                                value={bankAccountNumber}
                                onChangeText={setBankAccountNumber}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="اسم صاحب الحساب"
                                value={bankAccountHolder}
                                onChangeText={setBankAccountHolder}
                            />
                            <View style={styles.modalButtons}>
                                <Button style={styles.modalButton} mode="contained" onPress={() => setBankModalVisible(false)}>
                                    إلغاء
                                </Button>
                                <Button style={styles.modalButton} mode="contained" onPress={handleBankPayment}>
                                    دفع
                                </Button>
                            </View>
                        </Card>
                    </View>
                </Modal>

                {/* Vodafone Cash Modal */}
                <Modal visible={vodafoneModalVisible} animationType="slide" transparent>
                    <View style={styles.modalContainer}>
                        <Card style={styles.modalCard}>
                            <Title style={styles.modalTitle}>دفع بواسطة فودافون كاش</Title>
                            <Divider style={styles.divider} />
                            <TextInput
                                style={styles.input}
                                placeholder="رقم الهاتف"
                                value={vodafonePhoneNumber}
                                onChangeText={setVodafonePhoneNumber}
                            />
                            <View style={styles.modalButtons}>
                                <Button style={styles.modalButton} mode="contained" onPress={() => setVodafoneModalVisible(false)}>
                                    إلغاء
                                </Button>
                                <Button style={styles.modalButton} mode="contained" onPress={handleVodafonePayment}>
                                    دفع
                                </Button>
                            </View>
                        </Card>
                    </View>
                </Modal>

                {/* Posta Modal */}
                <Modal visible={postaModalVisible} animationType="slide" transparent>
                    <View style={styles.modalContainer}>
                        <Card style={styles.modalCard}>
                            <Title style={styles.modalTitle}>دفع بواسطة البوستة</Title>
                            <Divider style={styles.divider} />
                            <TextInput
                                style={styles.input}
                                placeholder="عنوان التوصيل"
                                value={postaAddress}
                                onChangeText={setPostaAddress}
                            />
                            <View style={styles.modalButtons}>
                                <Button style={styles.modalButton} mode="contained" onPress={() => setPostaModalVisible(false)}>
                                    إلغاء
                                </Button>
                                <Button style={styles.modalButton} mode="contained" onPress={handlePostaPayment}>
                                    دفع
                                </Button>
                            </View>
                        </Card>
                    </View>
                </Modal>
            </View>
        </Provider>
    );
};

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Droid',
    },
    paymentContainer: {
        alignItems: 'center',
    },
    paymentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    creditCardIcon: {
        color: '#1B98E0',
        marginRight: 10,
    },
    icon: {
        color: '#FFC107',
        marginRight: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCard: {
        marginHorizontal: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'Droid',
    },
    divider: {
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    modalButtons: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalButton: {
        width: '40%',
    },
    paymentText: {
        fontSize: 16,
        fontFamily: 'Droid',
    },
};

export default PaymentScreen;
