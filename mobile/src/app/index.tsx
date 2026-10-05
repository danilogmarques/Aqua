import { useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEMO_EMAIL = 'operador@aquagestao.com.br';
const DEMO_PASSWORD = 'agua2026';

export default function LoginScreen() {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  function handleLogin() {
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('Confira o e-mail e a senha de demonstração.');
      return;
    }

    router.replace('/orders');
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandPanel}>
            <View style={styles.brandLockup}>
              <View style={styles.brandMark}>
                <Text style={styles.brandBolt}>≈</Text>
              </View>
              <Text style={styles.brandName}>
                AQUA<Text style={styles.brandLight}> / EQUIPE</Text>
              </Text>
            </View>

            <View style={styles.brandMessage}>
              <Text style={styles.eyebrowLight}>GESTÃO DE SANEAMENTO</Text>
              <Text style={styles.brandTitle}>Água e cuidado{'\n'}em cada conexão.</Text>
              <Text style={styles.brandDescription}>
                Acesse os atendimentos e registre cada etapa do serviço em campo.
              </Text>
            </View>
            <Text style={styles.brandFooter}>ÁGUA · ESGOTO · EQUIPE DE CAMPO</Text>
          </View>

          <View style={styles.formPanel}>
            <Text style={styles.eyebrowDark}>ÁREA DA OPERAÇÃO</Text>
            <Text style={styles.heading}>Entrar na sua conta</Text>
            <Text style={styles.intro}>Acesse suas ordens de serviço.</Text>

            <View style={styles.form}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                accessibilityLabel="E-mail"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(value) => {
                  setEmail(value);
                  setError('');
                }}
                returnKeyType="next"
                style={styles.input}
                textContentType="emailAddress"
                value={email}
              />

              <Text style={[styles.label, styles.passwordLabel]}>Senha</Text>
              <View style={styles.passwordControl}>
                <TextInput
                  accessibilityLabel="Senha"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  onChangeText={(value) => {
                    setPassword(value);
                    setError('');
                  }}
                  onSubmitEditing={handleLogin}
                  returnKeyType="go"
                  secureTextEntry={!passwordVisible}
                  style={[styles.input, styles.passwordInput]}
                  textContentType="password"
                  value={password}
                />
                <Pressable
                  accessibilityLabel={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                  accessibilityRole="button"
                  onPress={() => setPasswordVisible((visible) => !visible)}
                  style={styles.passwordToggle}
                >
                  <Text style={styles.passwordToggleText}>
                    {passwordVisible ? 'Ocultar' : 'Mostrar'}
                  </Text>
                </Pressable>
              </View>

              {error ? (
                <Text accessibilityLiveRegion="polite" style={styles.error}>
                  {error}
                </Text>
              ) : null}

              <Pressable
                accessibilityRole="button"
                onPress={handleLogin}
                style={({ pressed }) => [
                  styles.submitButton,
                  pressed && styles.submitButtonPressed,
                ]}
              >
                <Text style={styles.submitText}>Entrar</Text>
                <Text style={styles.submitArrow}>→</Text>
              </Pressable>
            </View>

            <View style={styles.demoCredentials}>
              <View style={styles.demoDot} />
              <View style={styles.demoCopy}>
                <Text style={styles.demoTitle}>Acesso de demonstração</Text>
                <Text selectable style={styles.demoText}>
                  {DEMO_EMAIL} · {DEMO_PASSWORD}
                </Text>
              </View>
            </View>
            <Text style={styles.disclaimer}>
              Login demonstrativo. Não use estas credenciais em produção.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1a2821' },
  keyboardAvoidingView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  brandPanel: {
    minHeight: 285,
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 22,
    backgroundColor: '#102a35',
  },
  brandLockup: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  brandMark: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#72d7d0',
  },
  brandBolt: { color: '#102a35', fontSize: 26, fontWeight: '800', lineHeight: 30 },
  brandName: { color: '#f0f7f8', fontSize: 13, fontWeight: '800', letterSpacing: 1 },
  brandLight: { color: '#93abb0', fontWeight: '500' },
  brandMessage: { paddingVertical: 26 },
  eyebrowLight: { color: '#72d7d0', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  brandTitle: {
    marginTop: 13,
    color: '#f0f7f8',
    fontSize: 34,
    fontWeight: '600',
    letterSpacing: -0.8,
    lineHeight: 39,
  },
  brandDescription: { maxWidth: 330, marginTop: 10, color: '#b2c5c8', fontSize: 13, lineHeight: 20 },
  brandFooter: { color: '#91a9ad', fontSize: 9, fontWeight: '700', letterSpacing: 1.2 },
  formPanel: { flexGrow: 1, paddingHorizontal: 26, paddingTop: 28, paddingBottom: 22, backgroundColor: '#f2f7f8' },
  eyebrowDark: { color: '#168caa', fontSize: 10, fontWeight: '700', letterSpacing: 1.4 },
  heading: { marginTop: 10, color: '#18313a', fontSize: 25, fontWeight: '700', letterSpacing: -0.5 },
  intro: { marginTop: 5, marginBottom: 24, color: '#78878a', fontSize: 13 },
  form: { gap: 9 },
  label: { color: '#34484d', fontSize: 12, fontWeight: '700' },
  passwordLabel: { marginTop: 6 },
  input: {
    height: 48,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#d7e3e5',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    color: '#263c42',
    fontSize: 14,
  },
  passwordControl: { justifyContent: 'center' },
  passwordInput: { paddingRight: 82 },
  passwordToggle: { position: 'absolute', right: 12, minHeight: 44, justifyContent: 'center', paddingHorizontal: 4 },
  passwordToggleText: { color: '#647568', fontSize: 12, fontWeight: '600' },
  error: { color: '#a33b31', fontSize: 12 },
  submitButton: {
    minHeight: 48,
    marginTop: 7,
    paddingHorizontal: 15,
    borderRadius: 6,
    backgroundColor: '#9be2dc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submitButtonPressed: { backgroundColor: '#82d5ce', opacity: 0.85 },
  submitText: { color: '#102a35', fontSize: 14, fontWeight: '700' },
  submitArrow: { color: '#102a35', fontSize: 22, lineHeight: 24 },
  demoCredentials: {
    flexDirection: 'row',
    gap: 11,
    marginTop: 24,
    padding: 13,
    borderWidth: 1,
    borderColor: '#d1e9e8',
    borderRadius: 6,
    backgroundColor: '#e8f5f5',
  },
  demoDot: { width: 8, height: 8, marginTop: 3, borderRadius: 4, backgroundColor: '#168caa' },
  demoCopy: { flex: 1 },
  demoTitle: { marginBottom: 4, color: '#35545a', fontSize: 11, fontWeight: '700' },
  demoText: { color: '#617a7f', fontSize: 11 },
  disclaimer: { marginTop: 12, color: '#909990', fontSize: 10, lineHeight: 16 },
});
