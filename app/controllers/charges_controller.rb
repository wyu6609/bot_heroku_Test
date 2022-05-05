# require 'stripe'

# class ChargesController < ApplicationController
#   # skip_before_action :authorize
#   # def create
#   #     Stripe.api_key = ENV['STRIPE_SECRET_KEY']
#   #     YOUR_DOMAIN = 'http://localhost:4000'
#   #     session = Stripe::Checkout::Session.create({
#   #         line_items: [{
#   #   # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
#   #   price: "price_1KjTg5CpxluX9yaNrWetref5",
#   #      quantity: 1,
#   #   }],
#   # mode: 'payment',
#   # success_url: YOUR_DOMAIN + '/success',
#   # cancel_url: YOUR_DOMAIN + '/failure',
#   # })
#   #     return {url: session.url}.to_json
#   # end
# end
