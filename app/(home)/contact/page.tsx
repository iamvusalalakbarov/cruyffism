"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, Send, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/20 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-lg bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-sm text-orange-800 dark:text-orange-300">
              Əlaqə
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Cruyffism ilə Əlaqə</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Sualınız, təklifiniz, şikayətiniz və ya töhfəniz varsa, rahatlıqla bölüşə bilərsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 max-w-2xl mx-auto mb-12">
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <Mail className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">E-poçt</h3>
                {/*<p className="text-muted-foreground mb-4">24 saat ərzində cavablandırılır.</p>*/}
                <a href="mailto:iamvusalalakbarov@gmail.com" className="text-orange-600 hover:text-orange-700 transition-colors">
                  iamvusalalakbarov@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <Phone className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Telefon</h3>
                {/*<p className="text-muted-foreground mb-4">Monday-Friday, 9am-5pm CET</p>*/}
                <a href="tel:+994993651951" className="text-orange-600 hover:text-orange-700 transition-colors">
                  +994 99 365 19 51
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          {/*<div className="flex justify-center space-x-6 mb-12">*/}
          {/*  <a*/}
          {/*    href="#"*/}
          {/*    className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full text-orange-600 hover:bg-orange-200 dark:hover:bg-orange-800/30 transition-colors"*/}
          {/*    aria-label="Facebook"*/}
          {/*  >*/}
          {/*    <Facebook className="h-6 w-6" />*/}
          {/*  </a>*/}
          {/*  <a*/}
          {/*    href="#"*/}
          {/*    className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full text-orange-600 hover:bg-orange-200 dark:hover:bg-orange-800/30 transition-colors"*/}
          {/*    aria-label="Instagram"*/}
          {/*  >*/}
          {/*    <Instagram className="h-6 w-6" />*/}
          {/*  </a>*/}
          {/*</div>*/}

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Əlaqə Formu</h2>
            {isSubmitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">Müraciət göndərildi!</h3>
                <p className="text-green-700 dark:text-green-400">
                  Əlaqə saxladığınız üçün təşəkkür edirik! Sizə ən qısa zamanda geridönüş ediləcək.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Adınız
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Adınızı daxil edin"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-poçt
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="numune@gmail.com"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Mövzu
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    placeholder="Müraciətinizin başlığını qeyd edin"
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Kontent
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    placeholder="Fikirlərinizi bizimlə bölüşün..."
                    rows={6}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Göndərilir...</span>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    </>
                  ) : (
                    <>
                      Göndər
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
