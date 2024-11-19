import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import { Check } from "lucide-react";

const PricePage = () => {
  return (
    <div className="w-full bg-brand-25 h-screen pt-20 max-md:pt-10">
      <MaxWidthWrapper>
        <div className="flex flex-col gap-20 max-md:gap-10 items-center pb-10">
          <div className="flex flex-col gap-4  max-w-xl items-center">
            <span className="text-3xl md:text-4xl text-center font-semibold">
              Simple no-tricks pricing
            </span>
            <span className="text-sm text-center text-gray-500">
              We hate subscriptions. And chances are, you do too. That's why we
              offer lifetime access to PandaPulse for a one-time payment.
            </span>
          </div>

          <div className="flex w-full gap-5 max-w-5xl bg-white p-2 rounded-lg max-md:flex-wrap shadow-xl">
            <div className="flex flex-col gap-5  p-5 md:p-10 bg-white">
              <div className="flex flex-col gap-5">
                <span className="text-xl font-medium">Lifetime access</span>
                <span className="text-sm text-gray-500">
                  Invest once in PandaPulse and transform how you monitor your
                  Saas forever. Get instant alerts, track critical metrics and
                  never miss a beat in your business growth.
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <span className="text-sm flex text-brand-700">
                  What's included
                </span>
                <div className="h-px w-[60%] bg-gray-300" />
              </div>

              <div className="flex  gap-5">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <Check className="h-5 w-5 text-brand-700" />
                    <span className="text-sm text-gray-500">
                      10,000 real-time events per month
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Check className="h-5 w-5 text-brand-700" />
                    <span className="text-sm text-gray-500">
                      Advanced analytics and insights
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <Check className="h-5 w-5 text-brand-700" />
                    <span className="text-sm text-gray-500">
                      10 events categories
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Check className="h-5 w-5 text-brand-700" />
                    <span className="text-sm text-gray-500">
                      Priority Support
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-25 flex w-full rounded-lg items-center justify-center">
              <div className="flex flex-col gap-5 items-center">
                <span className="text-sm text-gray-600">
                  Pay once, own forever
                </span>
                <span className="text-4xl font-bold">
                  $18{" "}
                  <span className="text-sm font-medium text-gray-700">USD</span>
                </span>

                <Button
                  variant={"gooeyLeft"}
                  className="bg-brand-700"
                  size={"lg"}
                >
                  Get PandaPulse
                </Button>

                <span className="text-xs text-gray-500">
                  Secure payments. Start monitoring in minutes.
                </span>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default PricePage;
