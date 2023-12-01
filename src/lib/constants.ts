export const PASSWORD_MINIMUM_LENGTH = 8
export const PASSWORD_MAXIMUM_LENGTH = 20
export const USERNAME_MINIMUM_LENGTH = 4
export const USERNAME_MAXIMUM_LENGTH = 32
export const EMAIL_MAXIMUM_LENGTH = 32

export const notifs = {
    welcome: {
        title: "Merci pour votre inscription",
        body: "Explorer les campagnes",
        data: {
            event: "welcome",
        }
    },
    newcampaign: {
        title: "Nouvelle campagne créée",
        body: "Cliquez pour voir la nouvelle campagne",
        data: {
            event: "newCampaign",
            url: ''
        }
    },
    newcritique: {
        title: "Nouvelle critique ajoutée",
        body: "Cliquez pour lire la nouvelle critique",
        data: {
            event: "newCritique",
            url: ''
        }
    },
    likeOnCritique: {
        title: "Nouveau like sur votre critique",
        body: "Cliquez pour voir qui a aimé votre critique",
        data: {
            event: "likeOnCritique",
            critiqueId: "789012"
        }
    },
    critiqueSignaled: {
        title: "Critique signalée",
        body: "Cliquez pour examiner la critique signalée",
        data: {
            event: "critiqueSignaled",
            critiqueId: "789012"
        }
    }

}




