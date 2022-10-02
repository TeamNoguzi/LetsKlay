import { CreateRewardDto } from "@/dto";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { IconButton } from "stories/Buttons/IconButton";
import { v4 as uuidv4 } from "uuid";
import Button from "stories/Buttons/Button";

interface FormInput {
  rewards: CreateRewardDto[];
}

interface FormRewardItemsProps {
  rewardIdx: number;
  formProps: Pick<UseFormReturn<FormInput>, "control" | "register">;
}

const FormRewardItems = ({ formProps: { control, register }, rewardIdx }: FormRewardItemsProps) => {
  const { fields, append, remove } = useFieldArray({ control, name: `rewards.${rewardIdx}.items` });

  const handleAddItem = () => append({ name: "", quantity: 1, id: uuidv4() as unknown as number });
  const handleRemoveItem = (itemIdx: number) => remove(itemIdx);

  return (
    <>
      {fields.map((item, itemIdx) => (
        <React.Fragment key={item.id}>
          <Container className="px-0">
            <Row className="align-items-center mb-3">
              <Col xs={2} sm={1}>
                <IconButton icon={faMinus} onClick={() => handleRemoveItem(itemIdx)} />
              </Col>

              <Col xs={10} sm={3}>
                <Form.Group>
                  <Form.Control
                    {...register(`rewards.${rewardIdx}.items.${itemIdx}.quantity`, {
                      required: true,
                    })}
                    type="number"
                    min="1"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Control
                    {...register(`rewards.${rewardIdx}.items.${itemIdx}.name`, {
                      required: true,
                    })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      ))}

      <Button variant="outline" className="mb-3" onClick={handleAddItem}>
        Add Reward Item
      </Button>
    </>
  );
};

export default FormRewardItems;
