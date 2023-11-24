import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface KoalaWelcomeEmailProps {
    name: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

const VerifiedTeacherEmail = ({name}: KoalaWelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>
            La plateforme d&lsquo;évaluation éducative qui vous aide à améliorer vos cours.
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`${baseUrl}/static/logo.png`}
                    width="170"
                    height="50"
                    alt="StudentVoice"
                    style={logo}
                />
                <Text style={paragraph}>Bonjour  {name},</Text>
                <Text style={paragraph}>
                    Félicitations ! Vous avez été validé en tant que professeur sur StudentVoice.
                    Bienvenue sur notre plateforme qui permet aux étudiants de donner des retours
                    constructifs sur les cours, favorisant ainsi un environnement d&lsquo;apprentissage amélioré.
                </Text>
                <Section style={btnContainer}>
                    <Button  style={button} href="https://studentvoice.vercel.app/campagne">
                        Creer votre premier campagne
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Bien à vous,
                    <br />
                    L&lsquo;équipe de StudentVoice
                </Text>
                <Hr style={hr} />
                <Text style={footer}>Conakry - Gamal </Text>
            </Container>
        </Body>
    </Html>


);

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
};

const logo = {
    margin: '0 auto',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
};

const btnContainer = {
    textAlign: 'center' as const,
};

const button = {
    backgroundColor: '#ffbe32',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding:'10px'
};

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
};

export default VerifiedTeacherEmail;