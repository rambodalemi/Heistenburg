

export default function Trust() {
    return (
        <section className="border-t border-zinc-800 bg-black/50">
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="mb-8 text-3xl font-bold">Trusted by Our Users</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-zinc-900/50 p-6">
                        <div className="mb-2 text-4xl font-bold text-green-500">1000+</div>
                        <div className="text-zinc-400">Happy Customers</div>
                    </div>
                    <div className="rounded-lg bg-zinc-900/50 p-6">
                        <div className="mb-2 text-4xl font-bold text-yellow-500">24/7</div>
                        <div className="text-zinc-400">Customer Support</div>
                    </div>
                    <div className="rounded-lg bg-zinc-900/50 p-6">
                        <div className="mb-2 text-4xl font-bold text-green-500">100%</div>
                        <div className="text-zinc-400">Satisfaction Rate</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
