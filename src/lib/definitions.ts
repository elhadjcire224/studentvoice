import { z } from "zod";
import { LucideIcon } from "lucide-react";
import {
	EMAIL_MAXIMUM_LENGTH,
	PASSWORD_MINIMUM_LENGTH,
	PASSWORD_MAXIMUM_LENGTH,
	USERNAME_MAXIMUM_LENGTH,
	USERNAME_MINIMUM_LENGTH,
} from "./constants";

export type subject = {
	id: string;
	name: string;
};

export type naveitem = {
	href: string;
	icon: LucideIcon;
};

export enum Role {
	TEACHER = "TEACHER",
	STUDENT = "STUDENT",
	ADMIN = "ADMIN",
}

// zod schemas
export const teacherFormSchema = z
	.object({
		username: z
			.string()
			.min(USERNAME_MINIMUM_LENGTH, "Le nom d'utilisateur est trop court")
			.max(USERNAME_MAXIMUM_LENGTH, "nom trop long"),
		email: z
			.string()
			.email("entrez un mail valide")
			.max(EMAIL_MAXIMUM_LENGTH, "email trop long"),
		subject: z.string({
			required_error: "selectionnez votre matiere s'il vous plait",
		}),
		password: z
			.string()
			.min(PASSWORD_MINIMUM_LENGTH, "le mot de passe est trop court")
			.max(PASSWORD_MAXIMUM_LENGTH, "mot de passe trop long"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "les mots de passe doivent correspondre ",
		path: ["confirmPassword"],
	});
export type teacherFormType = z.infer<typeof teacherFormSchema>;

export const studentFormSchema = z
	.object({
		username: z
			.string()
			.min(USERNAME_MINIMUM_LENGTH, "Le nom d'utilisateur est trop court")
			.max(USERNAME_MAXIMUM_LENGTH, "nom trop long"),
		email: z
			.string()
			.email("entrez un mail valide")
			.max(EMAIL_MAXIMUM_LENGTH, "email trop long"),
		password: z
			.string()
			.min(PASSWORD_MINIMUM_LENGTH, "le mot de passe est trop court")
			.max(PASSWORD_MAXIMUM_LENGTH, "mot de passe trop long"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "les mots de passe doivent correspondre ",
		path: ["confirmPassword"],
	});
export type studentFormType = z.infer<typeof studentFormSchema>;

export const loginFormSchema = z.object({
	email: z
		.string()
		.email("entrez un email valide")
		.max(EMAIL_MAXIMUM_LENGTH, "email trop long"),
	password: z
		.string()
		.min(PASSWORD_MINIMUM_LENGTH, "mot de passe trop court")
		.max(PASSWORD_MAXIMUM_LENGTH, "mot de passe trop long"),
});
export type loginFormType = z.infer<typeof loginFormSchema>;

export const CreateCampaignFormSchema = z.object({
	title: z
		.string({ required_error: "ce champ est requis" })
		.min(5, { message: "titre trop court" })
		.max(100, { message: "title trop long" }),
	onemore: z.boolean().default(false)
});
export type createCampaignFormType = z.infer<typeof CreateCampaignFormSchema>

export const CreateCritiqueFormSchema = z.object({
	content: z
		.string({ required_error: "ce champ est requis" })
		.min(5, { message: "critique trop court" })
		.max(500, { message: "critique trop long" }),
	rate: z.number().default(1)
});
export type createCritiqueFormType = z.infer<typeof CreateCritiqueFormSchema>

