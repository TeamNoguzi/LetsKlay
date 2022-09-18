import { Collapse, Container, Form, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import Button from "stories/Buttons/Button";
import { FindProjectFullResponseDto, CreateRewardDto, FindRewardResponseDto } from "@/dto";
import { useProjectsUpdateMutation } from "hooks/queries";
import React, { useState } from "react";
import RewardCard from "stories/Cards/RewardCard";
import { IconButton } from "stories/Buttons/IconButton";
import { faCaretDown, faCaretUp, faMinus } from "@fortawesome/free-solid-svg-icons";
import { flexBox } from "styles/mixins";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "@emotion/react";
import moment from "moment";
import * as S from "./styled";

interface FormInput {
  rewards: CreateRewardDto[];
}

interface FormRewardsProps {
  project: FindProjectFullResponseDto;
}

const FormRewards = ({ project }: FormRewardsProps) => {
  const [selected, setSelected] = useState<number | false>(0);
  const mutation = useProjectsUpdateMutation();
  const { register, handleSubmit, watch, setValue, control } = useForm<FormInput>({
    defaultValues: {
      rewards: project.rewards.map((reward) => ({
        ...reward,
        deliveryStart: moment(reward.deliveryStart).format("YYYY-MM-DD") as unknown as Date,
        deliveryEnd: moment(reward.deliveryEnd).format("YYYY-MM-DD") as unknown as Date,
      })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "rewards", // unique name for your Field Array
  });

  const handleValidSubmit: SubmitHandler<FormInput> = (data) =>
    mutation.mutate({ project: { ...project, rewards: data.rewards } });

  const handleSelectReward = (rewardIdx: number) =>
    setSelected(rewardIdx !== selected ? rewardIdx : false);

  const handleAddReward = () => {
    append({
      title: "",
      price: 0,
      maxStock: 1,
      deliveryStart: new Date(),
      deliveryEnd: new Date(),
      description: "",
      items: [],
      stock: 1,
    });
  };
  const handleRemoveReward = (rewardIdx: number) => {
    remove(rewardIdx);
  };
  const handleAddItem = (rewardIdx: number) => {
    setValue(`rewards.${rewardIdx}.items`, [
      ...project.rewards[rewardIdx].items,
      { name: "", quantity: 1 },
    ]);
  };
  const handleRemoveItem = (rewardIdx: number, itemIdx: number) => {
    const newItems = [...project.rewards[rewardIdx].items];
    newItems.splice(itemIdx, 1);
    setValue(`rewards.${rewardIdx}.items`, newItems);
  };

  return (
    <>
      <S.FormTitle>Rewards</S.FormTitle>
      <hr className="mb-5" />
      <Button variant="outline" className="mb-3" onClick={handleAddReward}>
        Add New Reward
      </Button>

      <Form onSubmit={handleSubmit(handleValidSubmit)}>
        {fields.map((reward, rewardIdx) => (
          <React.Fragment key={reward.id}>
            <S.RewardToggle onClick={() => handleSelectReward(rewardIdx)}>
              <span>{reward.title}</span>
              <FontAwesomeIcon icon={selected === rewardIdx ? faCaretUp : faCaretDown} width={32} />
            </S.RewardToggle>

            <Collapse in={selected === rewardIdx} css={S.collapseStyle}>
              <Container className="my-1">
                <Row>
                  <Col md={12} lg={7} xl={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.title`, { required: true })}
                        placeholder="Beginner's pack"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.description`, {
                          required: true,
                        })}
                        placeholder="save money with beginner's pack"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.price`, {
                          required: true,
                        })}
                        type="number"
                        min="0"
                        step="any"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.maxStock`, {
                          required: true,
                          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                            setValue(`rewards.${rewardIdx}.stock`, e.target.value),
                        })}
                        type="number"
                        min="1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Delievery Start</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.deliveryStart`, {
                          required: true,
                          valueAsDate: true,
                        })}
                        type="date"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Delievery End</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.deliveryEnd`, {
                          required: true,
                          valueAsDate: true,
                        })}
                        type="date"
                      />
                    </Form.Group>

                    <Form.Label
                      css={css`
                        display: block;
                      `}
                    >
                      Items
                    </Form.Label>
                    {watch(`rewards.${rewardIdx}.items`).map((item, itemIdx) => (
                      <React.Fragment key={item.id}>
                        <Container className="px-0">
                          <Row className="align-items-center mb-3">
                            <Col xs={2} sm={1}>
                              <IconButton
                                icon={faMinus}
                                onClick={() => handleRemoveItem(rewardIdx, itemIdx)}
                              />
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

                    <Button
                      variant="outline"
                      className="mb-3"
                      onClick={() => handleAddItem(rewardIdx)}
                    >
                      Add Reward Item
                    </Button>
                  </Col>

                  <Col lg={5} xl={4} css={flexBox({ direction: "column", middle: true })}>
                    <RewardCard reward={watch(`rewards.${rewardIdx}`) as FindRewardResponseDto} />
                    <Button
                      variant="primary"
                      className="mt-4"
                      onClick={() => handleRemoveReward(rewardIdx)}
                    >
                      Remove Reward
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Collapse>
          </React.Fragment>
        ))}

        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default FormRewards;
