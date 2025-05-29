import { RiFacebookBoxFill } from "react-icons/ri";
RiFacebookBoxFill
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, FileText, Lock, Users, SearchCheck, ClipboardCheck } from 'lucide-react';

const steps = [
    {
        title: 'Assessment',
        description: 'Categorize assets into digital and physical. Estimate risk probability with 5% error.',
        icon: <SearchCheck className="h-6 w-6 text-blue-600" />,
    },
    {
        title: 'Build',
        description: 'Draft cyber security policy. Create specific policies for digital and physical assets.',
        icon: <FileText className="h-6 w-6 text-blue-600" />,
    },
    {
        title: 'Select',
        description: 'Define 3 level control for policy enforcement. 24x7 monitoring and access requirements.',
        icon: <Lock className="h-6 w-6 text-blue-600" />,
    },
    {
        title: 'Deployment',
        description: '4-phase testing and system evaluation. Increase control efficacy by 20% after testing.',
        icon: <ClipboardCheck className="h-6 w-6 text-blue-600" />,
    },
    {
        title: 'Awareness',
        description: 'Train management and staff. Encourage employees to follow the policy.',
        icon: <Users className="h-6 w-6 text-blue-600" />,
    },
    {
        title: 'Audit',
        description: 'Weekly control evaluation and monthly audits for changes and threats.',
        icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
    },
];

export default function SeguridadPoliticas() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">
                Hoja de ruta para la evaluación de activos de seguridad cibernética
            </h1>
            <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
                Esta hoja de ruta guía el desarrollo de políticas de seguridad para aplicaciones de empleos, abordando la evaluación, construcción, selección, despliegue, concienciación y auditoría.
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {steps.map((step, index) => (
                    <Card key={index} className="shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                {step.icon}
                                <h2 className="text-lg font-semibold text-blue-800">{step.title}</h2>
                            </div>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}