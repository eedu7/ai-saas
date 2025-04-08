import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { prismaDb } from "@/lib/prisma-client";

export async function POST(req: Request) {
    const body = await req.text();
    // @ts-ignore
    const signature = (await headers().get("Stripe-Signature")) as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOOK_SECRET!);
    } catch (error) {
        // @ts-ignore
        return new NextResponse(`Webhook Error: ${error?.message}`, {
            status: 400,
        });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", {
                status: 400,
            });
        }
        await prismaDb.userSubscription.create({
            data: {
                userId: session.metadata.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                // @ts-ignore
                stripeCurrentPeriodEnd: new Date(subscription.cancel_at * 1000),
            },
        });
    }
    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        await prismaDb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                // @ts-ignore
                stripeCurrentPeriodEnd: new Date(subscription.cancel_at * 1000),
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}
