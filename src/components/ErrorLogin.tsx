interface MensagemDeErrorProps {
    mensagem: string
}

export function ErrorLogin({ mensagem } : MensagemDeErrorProps) {
    return (
        <div className="w-full py-3 border border-1 rounded-lg border-red-500 text-center mb-4 text-red-700">
            {mensagem}
        </div>
    )
}