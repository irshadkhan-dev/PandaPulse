import React from "react";
import PandaIcon from "./PandaIcon";

const DisMsg = ({ content }: DisMsgInterface) => {
  return (
    <div className="flex flex-col gap-5 py-4">
      {content.map((c) => (
        <div key={c.type}>
          {c.type === "sale" ? (
            <>
              <div className="flex gap-2 items-center py-2 px-3">
                <PandaIcon />
                <span>PandaPulse</span>
              </div>
              <div className="flex flex-col gap-2 bg-[#2a2d31] rounded-md ml-10 mr-4 px-2 py-2 md:mx-14">
                <div className="flex gap-2">{c.emoji} Payment Received</div>
                <div className="text-gray-400">
                  Email: <span className="text-gray-300">{c.email}</span>
                </div>
                <div className="text-gray-400">Amount: {c.amount}</div>
                <div>Plan: {c.plan}</div>
              </div>
            </>
          ) : c.type === "sign-up" ? (
            <>
              <div className="flex gap-2 items-center py-2 px-3">
                <PandaIcon />
                <span>PandaPulse</span>
              </div>
              <div className="flex flex-col gap-2 bg-[#2a2d31] rounded-md ml-10 mr-4 px-2 py-2 md:mx-14">
                <div className="flex gap-2">{c.emoji} New user Signed up</div>
                <div>Email: {c.email}</div>
                <div>Name: {c.name}</div>
              </div>
            </>
          ) : c.type === "revenue" ? (
            <>
              <div className="flex gap-2 items-center py-2 px-3">
                <PandaIcon />
                <span>PandaPulse</span>
              </div>
              <div className="flex flex-col gap-2 bg-[#2a2d31] rounded-md ml-10 mr-4 px-2 py-2 md:mx-14">
                <div className="flex gap-2">
                  {c.emoji} Revenue Milestone Achieved
                </div>
                <div>Recurring Revenue: {c.recurringRevenue}</div>
                <div>Growth: {c.growth}</div>
              </div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default DisMsg;
