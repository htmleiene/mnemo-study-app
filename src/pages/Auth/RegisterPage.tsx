// RegisterPage.tsx
import React from 'react';
import { Label } from '@radix-ui/react-label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { ChevronRight } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-white to-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna da Esquerda */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center md:text-left">
            Crie sua conta
          </h2>
          <p className="text-sm text-gray-500 text-center md:text-left">
            Preencha os dados abaixo para começar a explorar o Mnemo.
          </p>
          <form className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome completo</Label>
              <input id="nome" type="text" placeholder="Seu nome completo" className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <input id="email" type="email" placeholder="seu@email.com" className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <input id="senha" type="password" placeholder="********" className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
              <Label htmlFor="confirmar-senha">Confirmar senha</Label>
              <input id="confirmar-senha" type="password" placeholder="********" className="border rounded px-3 py-2 w-full" />
            </div>
            <button type="submit" className="w-full mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">Criar conta</button>
          </form>
        </div>

        {/* Coluna da Direita */}
        <div className="flex flex-col justify-center items-center space-y-6 bg-gradient-to-tr from-indigo-50 via-white to-teal-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-700">
            Selecione sua grade curricular
          </h3>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolha sua grade curricular" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ti">Tecnologia da Informação</SelectItem>
              <SelectItem value="direito">Direito</SelectItem>
              <SelectItem value="adm">Administração</SelectItem>
              <SelectItem value="medicina">Medicina</SelectItem>
              <SelectItem value="engenharia">Engenharia</SelectItem>
            </SelectContent>
          </Select>

          <p className="text-sm text-gray-500 text-center">
            A grade selecionada será usada para recomendar matérias e organizar sua trilha de estudos.
          </p>

          <button className="text-sky-600 hover:underline flex items-center space-x-1 bg-transparent">
            <span>Já tem uma conta?</span> <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
