import React from "react";
import "./Activeoperations.css";
import OperationCard from "./Operationcard";

const OPERATIONS = [
  {
    id: 1,
    supplierName: "Denim Co. Cairo",
    collectionName: "Summer Clothing Collection",
    tags: ["100% Cotton", "Jeans"],
    status: "Negotiation in Progress",
    steps: ["RFQ Sent", "Counter Offer", "Deposit"],
    activeStep: "Counter Offer",
  },
  {
    id: 2,
    supplierName: "Cairo Textile Hub",
    collectionName: "Summer Clothing Collection",
    tags: ["100% Cotton", "Graphic", "T-shirts"],
    status: "In Transit",
    steps: ["Produced", "Shipped", "At Port", "Delivered"],
    activeStep: "At Port",
  },
];

export default function ActiveOperations({ onViewAll }) {
  return (
    <section className="ao-section">
     

      <div className="ao-list">
        {OPERATIONS.map((op, i) => (
          <OperationCard
            key={op.id}
            supplierName={op.supplierName}
            collectionName={op.collectionName}
            tags={op.tags}
            status={op.status}
            steps={op.steps}
            activeStep={op.activeStep}
            onViewOffer={() => console.log(`View offer for ${op.supplierName}`)}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </section>
  );
}