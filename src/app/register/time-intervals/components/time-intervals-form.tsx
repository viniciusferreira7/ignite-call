'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Control, InputRoot } from '@/components/ui/input'
import { IconArrowRight } from '@tabler/icons-react'

export function TimeIntervalsForm() {
  return (
    <div className="mt-6 space-y-4 rounded-md bg-gray-800 p-4 md:p-6">
      <form>
        <div className="mb-4 divide-y divide-gray-600 rounded-md border border-gray-600">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Checkbox />
              <p className="text-base font-medium text-gray-100">
                Segunda-feira
              </p>
            </div>
            <div className="flex items-center gap-4">
              <InputRoot className="border-none bg-gray-950">
                <Control type="time" step={60} className="input-time" />
              </InputRoot>
              <InputRoot className="border-none bg-gray-950">
                <Control type="time" step={60} className="input-time" />
              </InputRoot>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Checkbox />
              <p className="text-base font-medium text-gray-100">Terça-feira</p>
            </div>
            <div className="flex items-center gap-4">
              <InputRoot className="border-none bg-gray-950">
                <Control type="time" step={60} className="input-time" />
              </InputRoot>
              <InputRoot className="border-none bg-gray-950">
                <Control type="time" step={60} className="input-time" />
              </InputRoot>
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          size="h-auto"
          className="flex w-full items-center py-3"
        >
          Próximo passo <IconArrowRight size={16} />
        </Button>
      </form>
    </div>
  )
}
